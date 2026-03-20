import { FuncionCuadratica } from './funcion-cuadratica';

describe('FuncionCuadratica', () => {
  it('should create an instance', () => {
    expect(new FuncionCuadratica((x: number) => x * x)).toBeTruthy();
  });
});
