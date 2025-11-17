import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest/presets/default-esm',
    testEnvironment: 'node',
    testMatch: ['**/*.spec.ts', '**/*.test.ts'],
    transform: {
        '^.+\\.tsx?$': [
            'ts-jest',
            { useESM: true, tsconfig: 'tsconfig.json' }
        ]
    },
    extensionsToTreatAsEsm: ['.ts'],
    moduleFileExtensions: ['ts', 'js'],
    collectCoverageFrom: [
        'src/bll/**/*.ts',
        'src/dal/**/*.ts',
        'src/domain/**/*.ts',
        'src/utils/**/*.ts'
    ],
    coverageDirectory: 'coverage'
};

export default config;
