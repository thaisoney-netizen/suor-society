// The week planner behind /racepicks.
//
// The rule the tool sells is "one hard thing a day, and 48 hours between the
// hard run and heavy legs". The version of this built outside the repo printed
// that promise as fixed copy attached to each session, so when the inputs made
// it impossible the card still claimed it. Two available days produced heavy
// lower body on Monday, a marathon long run on Tuesday, and a Monday card
// reading "your hardest run stays at least 48 hours away". It was 24.
//
// So nothing here states a separation it has not measured. `plan()` schedules
// the week, measures the real gaps, and returns them; the UI reads the
// measurement. When the week cannot honor the rule, the shortfall goes in
// `notes` and the promise is not printed.

export const DAY_NAMES = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"] as const;
export type DayIndex = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export type Goal = "race" | "general";
export type Split = "upper-lower" | "full-body" | "push-pull";
export type RaceDistance = "5K" | "10K" | "Half marathon" | "Full marathon";

export type SessionKind =
  | "heavy-lower" | "upper" | "push" | "pull" | "full-body"
  | "long-run" | "quality-run" | "easy-run";

export type Session = {
  kind: SessionKind;
  name: string;
  /** A key session needs room around it. An easy one fills gaps. */
  key: boolean;
  note: string;
};

export type PlannedDay = {
  day: DayIndex;
  name: string;
  available: boolean;
  sessions: Session[];
};

export type Plan = {
  days: PlannedDay[];
  sessionCount: number;
  /** Measured hours between heavy legs and the hardest run, null when the week
   *  does not contain both. Day granularity, so a same-day pair reads 0. */
  legGapHours: number | null;
  /** The smallest measured gap between ANY two key sessions. */
  minKeyGapHours: number | null;
  /** True only when every key pair is at least 48 hours apart. The UI prints
   *  the promise if and only if this is true. */
  honorsSeparation: boolean;
  /** Plain sentences about what the plan could not do. Always rendered. */
  notes: string[];
};

export type PlanInput = {
  availableDays: DayIndex[];
  runs: number;
  lifts: number;
  goal: Goal;
  raceDistance: RaceDistance;
  split: Split;
  /** Day the user wants the long run pinned to, or null for no preference. */
  protectLongRunOn: DayIndex | null;
};

const HOURS_PER_DAY = 24;

/** The week repeats, so Sunday sits next to Monday. Every gap here is the
 *  shorter way round the circle, which is the gap the body actually gets. */
function circularGapDays(a: DayIndex, b: DayIndex): number {
  const raw = Math.abs(a - b);
  return Math.min(raw, 7 - raw);
}

/** The heavy day is always the leg day, whatever the split, because it is the
 *  session the running has to be spaced around.
 *
 *  The rest cycle. On an upper/lower split the cycle is upper then full body,
 *  not upper twice: a third lift on this split wants the whole body, and
 *  listing "Upper body strength" on two different days reads as a bug even
 *  when the volume is deliberate. A full body split repeats on purpose, so it
 *  is left alone. */
function liftNames(split: Split): { heavy: SessionKind; others: SessionKind[] } {
  if (split === "full-body") return { heavy: "heavy-lower", others: ["full-body"] };
  if (split === "push-pull") return { heavy: "heavy-lower", others: ["push", "pull"] };
  return { heavy: "heavy-lower", others: ["upper", "full-body"] };
}

const SESSION_COPY: Record<SessionKind, { name: string; note: string }> = {
  "heavy-lower": {
    name: "Heavy lower body",
    note: "Heaviest your legs get all week, so nothing else hard goes near it.",
  },
  upper: {
    name: "Upper body strength",
    note: "Doesn't touch your legs, so it can sit pretty much anywhere.",
  },
  push: { name: "Push day", note: "Chest, shoulders, triceps. Nothing that leaves your legs sore tomorrow." },
  pull: { name: "Pull day", note: "Back and biceps, and again nothing that hits the legs." },
  "full-body": {
    name: "Full body strength",
    note: "Lighter than the heavy day. You should be able to run the next morning without thinking about it.",
  },
  "long-run": {
    name: "Long run",
    note: "Longest run of the week, with an easy day behind it so it actually absorbs.",
  },
  "quality-run": {
    name: "Goal pace run",
    note: "The one run where pace matters, so you want fresh legs going into it.",
  },
  "easy-run": {
    name: "Easy run",
    note: "Easy enough to talk the whole way through. Most people run this one too hard.",
  },
};

function makeSession(kind: SessionKind, key: boolean): Session {
  return { kind, key, ...SESSION_COPY[kind] };
}

/** Which sessions the week wants, before we know whether they fit.
 *
 *  For a race goal the long run is a KEY session. Calling it easy was how the
 *  outside version let itself stack a lift on top of a marathon long run and
 *  still claim one hard thing a day. In a race build the long run is the
 *  point of the week. */
function wantedSessions(input: PlanInput): { keys: Session[]; easies: Session[] } {
  const { heavy, others } = liftNames(input.split);
  const keys: Session[] = [];
  const easies: Session[] = [];

  const raceBuild = input.goal === "race";
  const longRunIsKey = raceBuild && (input.raceDistance === "Half marathon" || input.raceDistance === "Full marathon");

  if (input.lifts > 0) keys.push(makeSession(heavy, true));
  if (input.runs > 0) {
    if (raceBuild) keys.push(makeSession("quality-run", true));
    if (input.runs > 1) {
      keys.push(makeSession("long-run", longRunIsKey));
      if (!longRunIsKey) easies.push(keys.pop()!);
    }
  }

  // Remaining lifts cycle through the non-leg days of the split.
  const remainingLifts = Math.max(0, input.lifts - 1);
  for (let i = 0; i < remainingLifts; i++) easies.push(makeSession(others[i % others.length], false));

  // Remaining runs are easy mileage.
  const placedRuns = keys.filter(s => s.kind.endsWith("run")).length + easies.filter(s => s.kind.endsWith("run")).length;
  for (let i = 0; i < Math.max(0, input.runs - placedRuns); i++) easies.push(makeSession("easy-run", false));

  return { keys, easies };
}

/** Every way to choose `n` days out of the available ones. n is at most 3 and
 *  the week has 7 days, so this is 35 combinations at worst. */
function combinations(days: DayIndex[], n: number): DayIndex[][] {
  if (n === 0) return [[]];
  if (days.length < n) return [];
  const [first, ...rest] = days;
  return [
    ...combinations(rest, n - 1).map(c => [first, ...c]),
    ...combinations(rest, n),
  ];
}

/** Places the key sessions on the days that maximise the smallest gap between
 *  any two of them, which is the whole job. Ties break toward putting the long
 *  run on the protected day, then toward the earliest arrangement so the same
 *  inputs always produce the same week. */
function placeKeys(keys: Session[], available: DayIndex[], protectDay: DayIndex | null) {
  const longRunIdx = keys.findIndex(s => s.kind === "long-run");
  let best: { days: DayIndex[]; minGap: number; protectScore: number } | null = null;

  for (const combo of combinations(available, keys.length)) {
    // Assign in day order so the week reads forward.
    const ordered = [...combo].sort((a, b) => a - b);
    let minGap = Infinity;
    for (let i = 0; i < ordered.length; i++) {
      for (let j = i + 1; j < ordered.length; j++) {
        minGap = Math.min(minGap, circularGapDays(ordered[i], ordered[j]));
      }
    }
    if (ordered.length < 2) minGap = 7;

    // Try each rotation of the key list against these days, so the long run can
    // land on the protected day without disturbing the spacing.
    for (let rot = 0; rot < keys.length; rot++) {
      const assign = keys.map((_, i) => ordered[(i + rot) % ordered.length]);
      const protectScore =
        longRunIdx >= 0 && protectDay !== null && assign[longRunIdx] === protectDay ? 1 : 0;
      const candidate = { days: assign, minGap, protectScore };
      if (
        !best ||
        candidate.minGap > best.minGap ||
        (candidate.minGap === best.minGap && candidate.protectScore > best.protectScore)
      ) {
        best = candidate;
      }
    }
  }
  return best;
}

export function plan(input: PlanInput): Plan {
  const available = [...new Set(input.availableDays)].sort((a, b) => a - b) as DayIndex[];
  const notes: string[] = [];

  const days: PlannedDay[] = DAY_NAMES.map((name, i) => ({
    day: i as DayIndex,
    name,
    available: available.includes(i as DayIndex),
    sessions: [],
  }));

  if (available.length === 0) {
    return {
      days, sessionCount: 0, legGapHours: null, minKeyGapHours: null,
      honorsSeparation: false,
      notes: ["Pick at least one day you can train and this builds itself."],
    };
  }

  const { keys, easies } = wantedSessions(input);

  // Keys first, and only as many as there are days. A key session with nowhere
  // to go is dropped rather than doubled up, because doubling up is the exact
  // thing this tool exists to prevent.
  const keysThatFit = keys.slice(0, available.length);
  const droppedKeys = keys.length - keysThatFit.length;

  const placement = placeKeys(keysThatFit, available, input.protectLongRunOn);
  const keyDays = placement?.days ?? [];
  keysThatFit.forEach((session, i) => {
    days[keyDays[i]].sessions.push(session);
  });

  // Easy sessions take the free available days first.
  const freeDays = available.filter(d => days[d].sessions.length === 0);
  let placedEasies = 0;
  for (const session of easies) {
    if (placedEasies < freeDays.length) {
      days[freeDays[placedEasies]].sessions.push(session);
      placedEasies++;
    }
  }
  const droppedEasies = easies.length - placedEasies;

  // ── Measure, then report. Nothing above this line asserts a separation. ──
  const keyPositions = keysThatFit.map((s, i) => ({ session: s, day: keyDays[i] }));
  let minKeyGapDays: number | null = null;
  for (let i = 0; i < keyPositions.length; i++) {
    for (let j = i + 1; j < keyPositions.length; j++) {
      const g = circularGapDays(keyPositions[i].day, keyPositions[j].day);
      minKeyGapDays = minKeyGapDays === null ? g : Math.min(minKeyGapDays, g);
    }
  }

  const legs = keyPositions.find(p => p.session.kind === "heavy-lower");
  const hardestRun =
    keyPositions.find(p => p.session.kind === "quality-run") ??
    keyPositions.find(p => p.session.kind === "long-run");
  const legGapDays = legs && hardestRun ? circularGapDays(legs.day, hardestRun.day) : null;

  const legGapHours = legGapDays === null ? null : legGapDays * HOURS_PER_DAY;
  const minKeyGapHours = minKeyGapDays === null ? null : minKeyGapDays * HOURS_PER_DAY;
  const honorsSeparation = minKeyGapHours === null ? true : minKeyGapHours >= 48;

  // ── Notes: what the week could not do, in plain sentences ──
  if (available.length < 3) {
    // Counts the days the reader actually picked. An earlier version said "on
    // two days something has to give" to someone who had picked one.
    const dayWord = available.length === 1 ? "one day" : "two days";
    notes.push(
      `Three days is really the floor for running and lifting in the same week. On ${dayWord} something has to give, and the rest of this list is what gave.`
    );
  }

  if (!honorsSeparation && legGapHours !== null && legGapHours < 48) {
    const when = legGapHours === 0 ? "on the same day as" : `${legGapHours} hours after`;
    notes.push(
      `Not enough days to keep 48 hours between heavy legs and your hardest run, so the run ends up ${when} the lift. Adding one more training day sorts this out on its own.`
    );
  } else if (!honorsSeparation && minKeyGapHours !== null) {
    notes.push(
      `Two of the key sessions land ${minKeyGapHours} hours apart, closer than the 48 this is aiming for. Add a day and they spread out.`
    );
  }

  // Only speak about the long run when there is one. A dropped long run was
  // being reported as having "moved to the day with the most recovery behind
  // it", on a plan that no longer contained a long run at all.
  const longRunInPlan =
    keyPositions.find(p => p.session.kind === "long-run") ??
    days.flatMap(d => d.sessions.map(s => ({ session: s, day: d.day }))).find(p => p.session.kind === "long-run");

  if (input.protectLongRunOn !== null && longRunInPlan) {
    const longRun = longRunInPlan;
    const wanted = input.protectLongRunOn;
    if (!available.includes(wanted)) {
      notes.push(
        `${DAY_NAMES[wanted]} isn't one of your training days, so the long run moved to ${DAY_NAMES[longRun.day]}, which has the most recovery behind it.`
      );
    } else if (longRun.day !== wanted) {
      notes.push(
        `Leaving the long run on ${DAY_NAMES[wanted]} would have crowded another key session, so it moved to ${DAY_NAMES[longRun.day]}.`
      );
    }
  }

  if (droppedKeys > 0) {
    notes.push(
      `Couldn't fit ${droppedKeys} key session${droppedKeys > 1 ? "s" : ""} into the days you picked, so ${droppedKeys > 1 ? "they came" : "it came"} off rather than doubling up on a day that already has one.`
    );
  }
  if (droppedEasies > 0) {
    notes.push(
      `${droppedEasies} lighter session${droppedEasies > 1 ? "s" : ""} came off to protect recovery. What's left is the part that actually moves the needle.`
    );
  }

  const sessionCount = days.reduce((n, d) => n + d.sessions.length, 0);

  return { days, sessionCount, legGapHours, minKeyGapHours, honorsSeparation, notes };
}
