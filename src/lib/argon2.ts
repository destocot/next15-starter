import { hash, verify, type Options } from "@node-rs/argon2";

const options: Options = {
  memoryCost: 19456,
  timeCost: 2,
  outputLen: 32,
  parallelism: 1,
};

export async function hashPassword(password: string) {
  const hashed = await hash(password, options);
  return hashed;
}

export async function verifyPassword(password: string, hash: string) {
  const verified = await verify(hash, password);
  return verified;
}
