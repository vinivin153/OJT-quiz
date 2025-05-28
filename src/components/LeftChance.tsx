import { TOTAL_CHANCES } from 'constants/constant';
import useHeaderStore from 'store/useHeaderStore';
import Heart from './Heart';

function LeftChance() {
  const { leftChance } = useHeaderStore((state) => state);

  return (
    <div className="flex items-center gap-3">
      <span className="text-2xl text-white/80 tracking-tight" style={{ fontFamily: 'BMJUA' }}>
        남은 기회
      </span>
      <div className="flex gap-1.5">
        {[...Array(TOTAL_CHANCES)].map((_, idx) => {
          const isActive = idx < leftChance;
          return <Heart key={idx} isActive={isActive} />;
        })}
      </div>
    </div>
  );
}

export default LeftChance;
