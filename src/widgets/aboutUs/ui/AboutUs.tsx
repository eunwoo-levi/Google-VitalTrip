export default function AboutUs() {
  return (
    <div className='mx-auto flex max-w-2xl flex-col gap-6 p-6 text-gray-700'>
      <h2 className='text-2xl font-bold text-blue-800'>🌍 About VitalTrip</h2>

      <section className='space-y-2'>
        <p>
          <strong>VitalTrip</strong> is a travel safety assistant app designed to help travelers
          handle medical emergencies abroad — overcoming language barriers and quickly locating
          nearby healthcare facilities.
        </p>
      </section>

      <section className='space-y-2'>
        <h3 className='text-lg font-semibold text-gray-900'>Key Features</h3>
        <ul className='list-inside list-disc space-y-1'>
          <li>🏥 Find nearby hospitals and pharmacies (Google Maps integrated)</li>
          <li>🌐 Translate symptoms into local language for clear communication</li>
          <li>📘 Emergency response guides & AI chatbot powered by Gemini</li>
          <li>🤖 Ask anything anytime with a smart travel chatbot</li>
        </ul>
      </section>

      <footer className='border-t pt-4 text-sm text-gray-500'>
        VitalTrip — your essential travel companion for health and safety.
      </footer>
    </div>
  );
}
