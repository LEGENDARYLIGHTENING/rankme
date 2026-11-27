export const GUARANTEE_TEXT = 'Milestone-based sign-off, terms in proposal.';

export default function Guarantee({ className = '', style = {} }) {
  return (
    <span className={className} style={style}>
      {GUARANTEE_TEXT}
    </span>
  );
}
