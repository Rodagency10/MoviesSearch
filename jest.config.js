export default {
  preset: 'ts-jest',
  // Change test environment to jsdom for React component testing
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Add this to handle Vite's env imports
    '^@/env$': '<rootDir>/src/env.ts'
  },
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: 'tsconfig.json',
      useESM: true,
      isolatedModules: true,
      esModuleInterop: true
    }],
  },
  // Add this to handle import.meta.env
  globals: {
    'import.meta': {
      env: {
        VITE_TMDB_API_KEY: 'test-api-key'
      }
    }
  },
  testMatch: [
    '**/__tests__/**/*.ts?(x)',
    '**/?(*.)+(spec|test).ts?(x)'
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
