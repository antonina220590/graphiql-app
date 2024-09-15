import '@testing-library/jest-dom';

vi.mock('firebase/auth', () => {
  return {
    getAuth: vi.fn(),
    signInWithEmailAndPassword: vi
      .fn()
      .mockResolvedValue({ user: { uid: 'test-uid' } }),
    signOut: vi.fn().mockResolvedValue({}),
    createUserWithEmailAndPassword: vi
      .fn()
      .mockResolvedValue({ user: { uid: 'test-uid' } }),
  };
});
