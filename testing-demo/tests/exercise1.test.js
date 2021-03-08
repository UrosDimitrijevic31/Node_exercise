const lib = require('../exercise1');

describe('fizzBuzz', () => {
    it('should throw an exception if input is not a number', () => {
        expect(() => { lib.fizzBuzz('a') }).toThrow();
        expect(() => { lib.fizzBuzz(null) }).toThrow();
        expect(() => { lib.fizzBuzz(undefined) }).toThrow();
        expect(() => { lib.fizzBuzz({}) }).toThrow();
        expect(() => { lib.fizzBuzz([]) }).toThrow(); 
    })

    //kada testiramo da li je broj deljiv ili tako nesto, dovoljno je SMAO JEDAN br da testiramo koji ispunjava uslove, ne moramo sve br generalno
    it('should return FizzBuzz if input is divisible by 3 adn 5', () => {
        const result = lib.fizzBuzz(15);
        expect(result).toBe('FizzBuzz');
    })

    it('should return Fizz if input is divisible by 3', () => {
        const result = lib.fizzBuzz(3);
        expect(result).toBe('Fizz')
    })

    it('should return Fizz if input is divisible by 5', () => {
        const result = lib.fizzBuzz(5);
        expect(result).toBe('Buzz')
    })

    it('should return input if it not divisible by 5 or 3', () => {
        const result = lib.fizzBuzz(4);
        expect(result).toBe(4)
    })

    
})