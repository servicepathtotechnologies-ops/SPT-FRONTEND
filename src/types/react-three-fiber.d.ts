/**
 * Extend JSX so React Three Fiber primitives (group, mesh, etc.) are typed.
 * Must be an ambient declaration (no import/export) so the merge applies to all TS files.
 */
import type { ThreeElements } from "@react-three/fiber";

declare global {
  namespace JSX {
    interface IntrinsicElements extends ThreeElements {}
  }
}
