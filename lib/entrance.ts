/*
 * When a page is allowed to play its hero choreography.
 *
 * The rule is once per page per session, and entrance OR morph — never both on
 * one navigation. A view transition snapshots the incoming page in a single
 * frame, so an entrance running underneath it gets captured mid-flight at
 * opacity 0, which is the mobile "cut off, then suddenly appears" bug.
 *
 * Kept here as pure functions because every bug this feature has had was in
 * exactly this logic: a trailing-slash mismatch that made every non-root page
 * look unvisited forever, an entrance restarting on the page being left, and a
 * stale flag replaying entrances on Back. None of those were reachable from a
 * unit test while the logic lived inside a click handler.
 *
 * See components/view-transition-link.tsx for where these are applied.
 */

/*
 * next.config sets trailingSlash, so the same route is spelled "/about" in an
 * href and "/about/" in location. Both sides of every lookup go through here.
 * Root is deliberately left as "/" — it was the one path that matched by luck
 * before this existed.
 */
export const normalisePath = (path: string): string =>
  path.length > 1 && path.endsWith("/") ? path.slice(0, -1) : path

/*
 * Decided when a link is clicked, because only the click knows whether this
 * navigation carries a shared element. A link that does — a work card flying
 * its screenshot into the case-study hero — always morphs: that IS the
 * arrival's entrance, and it would otherwise fight a transform entrance on the
 * very same node.
 */
export const playsEntranceOnNavigation = (
  destination: string,
  visited: ReadonlySet<string>,
  carriesSharedElement: boolean,
): boolean => {
  if (carriesSharedElement) return false
  return !visited.has(normalisePath(destination))
}

/*
 * Decided when a route commits, which is the only safe moment to touch the
 * attribute: at click time the page being left is still mounted, and enabling
 * entrances would restart ITS animations on the way out.
 *
 * `pending` carries the click's decision. It is null for navigations that never
 * ran through a link — Back, Forward, any popstate — where falling back to the
 * visited set is exactly right, since anything reachable by Back has been seen.
 */
export const resolveEntranceOnCommit = (
  path: string,
  visited: ReadonlySet<string>,
  pending: boolean | null,
): boolean => {
  if (pending !== null) return pending
  return !visited.has(normalisePath(path))
}
