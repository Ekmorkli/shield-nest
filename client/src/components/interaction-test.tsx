import { useState } from 'react';
import { Button } from "@/components/ui/button";

export default function InteractionTest() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('Ready');

  const testButton = () => {
    setCount(prev => prev + 1);
    setMessage('Button clicked!');
    console.log('Test button clicked:', count + 1);
  };

  const testConsultation = () => {
    const event = new CustomEvent('showConsultationPopup');
    window.dispatchEvent(event);
    setMessage('Consultation popup triggered');
    console.log('Consultation popup event dispatched');
  };

  return (
    <div className="fixed top-20 right-4 z-50 bg-white p-4 rounded-lg shadow-lg border">
      <h3 className="text-black font-bold mb-2">Interaction Test</h3>
      <p className="text-black text-sm mb-2">Status: {message}</p>
      <p className="text-black text-sm mb-3">Count: {count}</p>
      <div className="space-y-2">
        <Button onClick={testButton} className="w-full">
          Test Button
        </Button>
        <Button onClick={testConsultation} className="w-full bg-green-600">
          Test Consultation
        </Button>
      </div>
    </div>
  );
}