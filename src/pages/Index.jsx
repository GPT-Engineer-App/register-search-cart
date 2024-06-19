import React, { useState } from 'react';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Index = () => {
  const [domain, setDomain] = useState('');
  const [availability, setAvailability] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const checkDomainAvailability = async () => {
    try {
      const response = await axios.get(`/api/check-domain?domain=${domain}`);
      setAvailability(response.data.available);
      setSuggestions(response.data.suggestions);
      setError(null);
    } catch (err) {
      setError('An error occurred while checking the domain availability.');
      setAvailability(null);
      setSuggestions([]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Domain Search</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Enter domain name"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>
          <Button onClick={checkDomainAvailability}>Check Availability</Button>
        </CardContent>
      </Card>

      {availability !== null && (
        <div className="mt-4">
          {availability ? (
            <Alert>
              <AlertTitle>Domain Available!</AlertTitle>
              <AlertDescription>
                The domain <strong>{domain}</strong> is available.
                <Button variant="outline" className="ml-4">Add to Cart</Button>
              </AlertDescription>
            </Alert>
          ) : (
            <Alert>
              <AlertTitle>Domain Not Available</AlertTitle>
              <AlertDescription>
                The domain <strong>{domain}</strong> is not available. Here are some suggestions:
                <ul className="mt-2">
                  {suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}

      {error && (
        <div className="mt-4">
          <Alert>
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default Index;