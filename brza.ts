export type Value = string | number;

export const ComparisonOperator = '==' as const;
export type ComparisonOperator = typeof ComparisonOperator;

export type Context = Record<string, Value>;
export type Variable = string; // starts with $

export type ComparisonExpression = [ComparisonOperator, Variable | Value, Variable | Value];

export function evaluateComparison(expression: ComparisonExpression, context: Context = {}): boolean {
  let val1: string = '';
  let val2: string = '';
  if (typeof expression[1] == 'string' && expression[1].startsWith('$')) {
    val1 = expression[1].replace('$', '');
    if (typeof expression[2] == 'string' && expression[2].startsWith('$')) {
      val2 = expression[2].replace('$', '');
    }
    return context[val1] === context[val2];
  }

  return expression[1] === expression[2];
}



=========
import { evaluateComparison } from './evaluate'

describe('evaluate comparison expression', () => {
  it('should consider "Briza" equal to "Briza"', () => {
    expect(evaluateComparison(['==', 'Briza', 'Briza'])).toBeTruthy()
  })

  it('should consider "Briza" different from "briza"', () => {
    expect(evaluateComparison(['==', 'Briza', 'briza'])).toBeFalsy()
  })

  it('should consider 10 equal to 10', () => {
    expect(evaluateComparison(['==', 10, 10])).toBeTruthy()
  })

  it('should not consider "10" equal to 10', () => {
    expect(evaluateComparison(['==', '10', 10])).toBeFalsy()
  })
})

describe('evaluate comparison expression with variables', () => {
  it('should consider "$value" equal to "Briza"', () => {
    expect(
      evaluateComparison(['==', '$value', 'Briza'], { value: 'Briza' })
    ).toBeTruthy()
  })

  it('should consider "$value" equal to 10', () => {
    expect(evaluateComparison(['==', '$value', 10], { value: 10 })).toBeTruthy()
  })

  it('should consider 10 equal to "$value"', () => {
    expect(evaluateComparison(['==', 10, '$value'], { value: 10 })).toBeTruthy()
  })

  it('should not consider 10 equal to "$value"', () => {
    expect(evaluateComparison(['==', 10, '$value'], { value: 20 })).toBeFalsy()
  })

  it('should consider "$a" equal to "$b"', () => {
    expect(
      evaluateComparison(['==', '$a', '$b'], { a: 10, b: 10 })
    ).toBeTruthy()
  })

  it('should not consider "$" equal to 10', () => {
    expect(evaluateComparison(['==', '$', 10], { ['']: 10 })).toBeFalsy()
  })

  it('should not consider "$a" equal to "$b" when "$b" is not found in context', () => {
    expect(evaluateComparison(['==', '$a', '$b'], { a: 10 })).toBeFalsy()
  })

  it('should consider "$a" equal to "$b" when both are not found in context', () => {
    expect(evaluateComparison(['==', '$a', '$b'], {})).toBeTruthy()
  })

  it('should consider "$" equal to "$value" when $value is "$"', () => {
    expect(
      evaluateComparison(['==', '$', '$value'], { value: '$' })
    ).toBeTruthy()
  })

  it('should not replace $ in the middle of the value', () => {
    expect(evaluateComparison(['==', 'a$a', 10], { aa: 10 })).toBeFalsy()
  })

  it('should not replace $ in the middle of the variable', () => {
    expect(evaluateComparison(['==', '$a$a', 10], { a$a: 10 })).toBeTruthy()
  })

  it('should not consider undefined value equal to "$"', () => {
    expect(evaluateComparison(['==', '$value', '$'], {})).toBeFalsy()
  })
})
