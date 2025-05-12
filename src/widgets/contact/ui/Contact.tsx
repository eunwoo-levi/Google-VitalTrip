export default function Contact() {
  return (
    <div className='mx-auto max-w-md space-y-4 p-6 text-gray-800 md:max-w-lg'>
      <h2 className='text-2xl font-bold text-blue-700'>📬 Contact Us</h2>
      <p className='text-sm text-gray-600'>
        If you encounter any issues or have questions regarding the service, please don't hesitate
        to reach out.
      </p>
      <p className='text-md'>
        You can contact us anytime at:{' '}
        <a
          href='mailto:eunwoo1341@gmail.com'
          className='text-blue-600 underline hover:text-blue-800'
        >
          eunwoo1341@gmail.com
        </a>
      </p>
      <p className='text-sm text-gray-500'>
        We usually respond within 24 hours. Your feedback is always appreciated!
      </p>
    </div>
  );
}
