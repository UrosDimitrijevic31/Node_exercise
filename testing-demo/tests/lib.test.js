const lib = require('../lib')
const db = require('../db');
const mail = require('../mail');

//describe sluzi za grupisanje istih testova
describe('absolute', () => {
    it('should return a positive number if input is positive', () => {
        const result = lib.absolute(1);
        expect(result).toBe(1);
    }) 
    
    it('should return a positive number if input is negative', () => {
        const result = lib.absolute(-1);
        expect(result).toBe(1);
    }) 
    
    it('should return  a 0 number if input is 0', () => {
        const result = lib.absolute(0);
        expect(result).toBe(0);
    }) 
})

describe('greet', () => {
    it('should return the greeting message', () => {
        const result = lib.greet('Mosh');
        expect(result).toMatch(/Mosh/); //mozemo da koristimo regularne izraze u radu sa stringovima
        expect(result).toContain('Mosh');
    });
})

describe('getCurrencies', () => {
    it('should return supported currencies', () => {
        const result = lib.getCurrencies();

        //Too general
        expect(result).toBeDefined();
        expect(result).not.toBeNull();

        //Too specific
        expect(result[0]).toBe('USD');
        expect(result[1]).toBe('AUD');
        expect(result[2]).toBe('EUR');
        expect(result.length).toBe(3);

        //Proper way
        expect(result).toContain('USD');
        expect(result).toContain('AUD');
        expect(result).toContain('EUR');
        
        //Ideal way
        expect(result).toEqual(expect.arrayContaining(['EUR', 'USD', 'AUD']));
    
    });
})

describe('getProduct', () => {
    it('should return product with given id', () => {
        const result = lib.getProduct(1);
        expect(result).toEqual({ id: 1, price: 10 }); //kad hocemo tacno poklapanje objekta
        expect(result).toMatchObject({ id: 1, price: 10 }); //kad hocemo da te propertije sadrzi objekat, moze da ih ima 50, nama su bitna ta 2
        expect(result).toHaveProperty('id', 1); //proverava da li posotji ovaj properti, i proverimo tip
    });
})

describe('resgisterUser', () => {
    it('should throw if username is falsy', () => {    
        const args = [null, undefined, NaN, '', false]; //sve ovo vraca fasle
        args.forEach( a => {
            expect(() => { lib.registerUser(a) }).toThrow(); //kad se testiraju greske drugaciji je pristup
        })
    })

    it('should return a user object if valid username is passed', () => {
        const result = lib.registerUser('Uros');
        expect(result).toMatchObject({ username: 'Uros'});
        expect(result.id).toBeGreaterThan(0);    
    })
})

describe('applyDiscount', () => {
    it('should apply 10% discount if customer has more than 10 points', () => {

    //fake or MOCK funkcija, simulira funkciju iz baze, simuliramo podatke, ene zelimo da komunciiramo sa stvarnim serverima
        db.getCustomerSync = function(customerId) { 
            console.log('Fake reading customer...');
            return { id: customerId, points: 20};
        }
        const order = {customerId: 1, totalPrice: 10};
        lib.applyDiscount(order);
        expect(order.totalPrice).toBe(9);
    })
})

describe('notifyCustomer', () => {
    it('should send an email to the customer', () => {
        
        // const mockFunction = jest.fn(); //fn - funkcija
        // mockFunction.mockReturnValue(1);
        // mockFunction.mockResolveValue(1); //vraca promsie
        // mockFunction.mockRejectValue(new Error('...')); //simuliramo gresku
        // const result = await mockFunction();
        
        db.getCustomerSync = jest.fn().mockReturnValue({ email: 'a'});
        mail.send = jest.fn();

        lib.notifyCustomer({customerId: 1});

        expect(mail.send).toHaveBeenCalled(); //da li je pozvana funkcija, ako jeste mejl je poslat
        expect(mail.send.mock.calls[0][0]).toBe('a'); //proveravamo argumente koji su poslati, to je niz zato treba [][]
        expect(mail.send.mock.calls[0][1]).toMatch(/order/);
        

        // db.getCustomerSync = function(customerId) { 
        //     return { email: 'a'}
        // }

        // let mailSend = false;
        // mail.send = function(email, message) {
        //     mailSend = true;
        // }
        // lib.notifyCustomer({customerId: 1});
        // expect(mailSend).toBe(true);
    })
})



