import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

export default function DebugTest() {
  const [count, setCount] = useState(0);
  const [checked, setChecked] = useState(false);
  const [text, setText] = useState('');

  return (
    <div className="p-8 bg-white border border-gray-300 rounded-lg m-4">
      <h3 className="text-black mb-4">Debug Test Component</h3>
      
      <div className="space-y-4">
        <div>
          <Button 
            onClick={() => {
              console.log('Button clicked, count:', count);
              setCount(count + 1);
            }}
            className="bg-blue-500 hover:bg-blue-600 text-white"
          >
            Click Count: {count}
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="test-checkbox"
            checked={checked}
            onCheckedChange={(value) => {
              console.log('Checkbox changed:', value);
              setChecked(value as boolean);
            }}
          />
          <label htmlFor="test-checkbox" className="text-black">
            Test Checkbox: {checked ? 'Checked' : 'Unchecked'}
          </label>
        </div>

        <div>
          <Input
            placeholder="Type here to test input"
            value={text}
            onChange={(e) => {
              console.log('Input changed:', e.target.value);
              setText(e.target.value);
            }}
            className="border border-gray-300 text-black"
          />
          <p className="text-black mt-2">Input value: {text}</p>
        </div>
      </div>
    </div>
  );
}