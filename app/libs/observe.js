import { Observable } from 'apollo-client/util/Observable';

const data = new Observable((observe) => {
  observe.next('hello');
});

data.subscribe((value) => {
  console.log(value);
});
