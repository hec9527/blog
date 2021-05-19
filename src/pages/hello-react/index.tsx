import React from 'react';
import Layout from '@theme/Layout';

export default function () {
  return (
    <Layout title='hello'>
      <div style={{ display: 'flex', height: 200, justifyContent: 'space-evenly', alignItems: 'center' }}>
        {new Array(3).fill(0).map((_, i) => (
          <div
            style={{
              background: `hsl(${(Math.random() * 255) | 0}, 80%, 90%)`,
              height: '100%',
              width: '30%',
              display: 'grid',
              placeItems: 'center',
            }}
          >
            容器{i}
          </div>
        ))}
      </div>
    </Layout>
  );
}
