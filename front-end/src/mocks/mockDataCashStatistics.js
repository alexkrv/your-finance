import { v4 as uuidv4 } from 'uuid';

const statistics = [{
	timeStamp: Date.now(),
	value: Math.round(Math.random()*1000),
	currencyId: 'RUB',
	comment: '',
	id: uuidv4()
},
{
	timeStamp: Date.now(),
	value: Math.round(Math.random()*1000),
	currencyId: 'USD',
	comment: '',
	id: uuidv4()
},
{
	timeStamp: Date.now(),
	value: Math.round(Math.random()*1000),
	currencyId: 'RUB',
	comment: '',
	id: uuidv4()
},
{
	timeStamp: Date.now(),
	value: Math.round(Math.random()*1000),
	currencyId: 'EUR',
	comment: '',
	id: uuidv4()
}];

export default statistics;