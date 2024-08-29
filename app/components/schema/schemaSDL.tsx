'use client';

import React, { useEffect, useState } from 'react';
import {
  buildClientSchema,
  printSchema,
  GraphQLSchema,
  getIntrospectionQuery,
} from 'graphql';

const GRAPHQL_URL = 'https://graphql-pokeapi.graphcdn.app/?sdl';

const SchemaFetcher: React.FC = () => {
  const [schemaSDL, setSchemaSDL] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchema = async () => {
      const introspectionQuery = getIntrospectionQuery();

      try {
        const response = await fetch(GRAPHQL_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: introspectionQuery }),
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        if (result.errors) {
          throw new Error(
            `Errors returned from GraphQL: ${JSON.stringify(result.errors)}`
          );
        }
        const schemaData = result.data;
        if (!schemaData || !schemaData.__schema) {
          throw new Error('Invalid introspection response: missing __schema');
        }

        const schema: GraphQLSchema = buildClientSchema(schemaData);
        setSchemaSDL(printSchema(schema).replace(/"""/g, ''));
      } catch (error: unknown) {
        setError((error as Error).message);
      }
    };

    fetchSchema();
  }, [schemaSDL]);

  return (
    <div>
      <h1>GraphQL Schema</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <pre className=" h-full">{schemaSDL}</pre>
      )}
    </div>
  );
};

export default SchemaFetcher;
