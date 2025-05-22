type ConntorProps = {
  isSolved: boolean;
};

function Connector({ isSolved }: ConntorProps) {
  return (
    <div
      className={`w-20 h-2 mx-1 rounded-full transition-all duration-500 ${isSolved ? 'bg-[gold]' : 'bg-[#f0f0f0]'} `}
    />
  );
}

export default Connector;
