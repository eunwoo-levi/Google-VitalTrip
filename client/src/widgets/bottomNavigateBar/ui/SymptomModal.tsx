import { SYMPTOMS } from '@/src/features/firstAid/data/symptom';
import Modal from '@/src/shared/ui/Modal';

export const SymptomModal = ({
  closeSymptomModal,
  updateSymptomData,
  symptomData,
  isDisabled = false,
  handleSubmit,
}: {
  closeSymptomModal: () => void;
  updateSymptomData: (e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>) => void;
  symptomData: { type: string; detail: string };
  isDisabled: boolean;
  handleSubmit: () => void;
}) => {
  return (
    <Modal key='symptom-modal' onClose={closeSymptomModal}>
      <h2 className='mb-4 text-center text-xl font-bold'>Describe your symptom</h2>
      <select
        name='type'
        className='mb-4 w-full rounded-md border border-gray-300 p-2 text-sm font-semibold focus:ring-2 focus:ring-blue-400 focus:outline-none'
        onChange={(e) => updateSymptomData(e)}
        value={symptomData.type}
      >
        <option value='' disabled>
          Select symptom
        </option>
        {SYMPTOMS.map((symptom) => (
          <option key={symptom.code} value={symptom.code} className='font-semibold'>
            {symptom.label}
          </option>
        ))}
      </select>
      <textarea
        name='detail'
        className='mb-4 h-32 w-full resize-none rounded-md border border-gray-300 p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:outline-none'
        placeholder='Describe your symptoms in detail'
        value={symptomData.detail}
        onChange={(e) => updateSymptomData(e)}
      />
      <button
        disabled={isDisabled}
        onClick={handleSubmit}
        className={`w-full rounded-md px-4 py-2 text-white transition-colors duration-200 ${
          isDisabled
            ? 'cursor-not-allowed bg-gray-300'
            : 'cursor-pointer bg-blue-500 hover:bg-blue-600'
        }`}
      >
        Submit
      </button>
    </Modal>
  );
};
