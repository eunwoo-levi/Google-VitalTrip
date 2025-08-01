interface CheckEmailButtonProps {
  onCheck: () => void;
  isLoading: boolean;
}

export const CheckEmailButton = ({ onCheck, isLoading }: CheckEmailButtonProps) => {
  return (
    <button
      className='rounded-md bg-blue-500 px-1 font-semibold text-white transition-colors duration-300 hover:bg-blue-600 disabled:bg-blue-300'
      onClick={onCheck}
      disabled={isLoading}
    >
      {isLoading ? 'Checking...' : 'Check Availability'}
    </button>
  );
};
