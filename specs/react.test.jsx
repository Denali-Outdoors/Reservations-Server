/* eslint-disable no-undef */

import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App';
import Title from '../client/src/components/Title';
import DateSelector from '../client/src/components/DateSelector';
import Calendar from '../client/src/components/Calendar';
import TimeSelector from '../client/src/components/TimeSelector';
import PartySelector from '../client/src/components/PartySelector';
import ReserveButton from '../client/src/components/ReserveButton';
/*
  *****    TEST APP     *****
*/

describe('<App />', () => {
  const component = shallow(<App />);

  it('should render one Title component', () => {
    expect(component.find(Title)).toHaveLength(1);
  });

  it('should render one DateSelector component', () => {
    expect(component.find(DateSelector)).toHaveLength(1);
  });

  it('should render one TimeSelector component', () => {
    expect(component.find(TimeSelector)).toHaveLength(1);
  });

  it('should render one PartySelector component', () => {
    expect(component.find(PartySelector)).toHaveLength(1);
  });

  it('should render one ReserveButton component', () => {
    expect(component.find(ReserveButton)).toHaveLength(1);
  });
});

/*
  *****    TEST TITLE     *****
*/

describe('<Title />', () => {
  const component = render(<Title />);
  it('should render the title "Make a Reservation"', () => {
    expect(component.find('[data-test="title"]').text()).toBe('Make a Reservation');
  });
});

/*
  *****    TEST DATE SELECTOR     *****
*/

xdescribe('<DateSelector />', () => {
  const component = shallow(<DateSelector />);
  it('should render a calendar icon', () => {
    expect(component.contains('<img src="calendar.ico">')).toBe(true);
  });

  it('should render an input field with the current day as the default value', () => {
    const newDay = new Date();
    const today = `${newDay.getDay}, ${newDay.getMonth} ${newDay.getDate}`;
    expect(component.find('[data-test="today"]').text()).toBe(today);
  });

  it('should render the <Calendar /> component when focused', () => {
    component.simulate('click');
    expect(component.find(Calendar)).toHaveLength(1);
  });
});

/*
  *****    TEST CALENDAR     *****
*/

xdescribe('<Calendar />', () => {
  const component = shallow(<Calendar />);
  const newDate = new Date();
  it('should render a all seven days of the week', () => {
    expect(component.find('.dayHeader')).toHaveLength(7);
  });
  it('should render all days in the current month', () => {
    expect(component.find('.currentMonthDay')).toHaveLength(newDate.getDate());
  });
  it('should have the current day selected by default', () => {
    expect(component.find('.focusedDate').text()).toBe(new Date().getDay);
  });
  it('should change the selected day when a day is clicked', () => {
    const nextDay = new Date().getDate() + 1;
    component.findWhere((day) => day.text() === nextDay).simulate('click');
    expect(component.find('.focusedDate').text()).toBe(nextDay);
  });
});

/*
  *****    TEST TIME SELECTOR     *****
*/

xdescribe('<TimeSelector />', () => {
  const timeOptions = ['12:30', '13:00', '13:30', '14:00'];

  const component = shallow(<TimeSelector timeOptions={timeOptions} />);

  it('should render a clock icon', () => {
    expect(component.contains('<img src="clock.ico">')).toBe(true);
  });

  it('should render a <select> field', () => {
    expect(component.find('<select>')).toHaveLength(1);
  });
  it('should render all possible reservation times as options in its select field', () => {
    expect(component.find('option')).toHaveLength(4);
  });
  it('should change the selected time when an option is clicked', () => {
    component.find('option')[2].simulate('click');
    expect(component.find('select').props().value).toBe('13:30');
  });
});

/*
  *****    TEST PARTY SELECTOR     *****
*/

xdescribe('<PartySelector />', () => {
  const component = shallow(<PartySelector />);
  it('should render a party icon', () => {
    expect(component.contains('<img src="party.ico"')).toBe(true);
  });
  it('should render a <select> field', () => {
    expect(component.contains('select')).toBe(true);
  });
  it('should render six options in its select field', () => {
    expect(component.find('option')).toHaveLength(6);
  });
  it('should change the selected party size when an option is clicked', () => {
    component.find('option')[1].simulate('click');
    expect(component.find('select').props().value).toBe(2);
  });
});

/*
  *****    TEST RESERVE BUTTON     *****
*/

xdescribe('<ReserveButton />', () => {
  it('should display "Find a Table"', () => {
    const component = render(<ReserveButton />);
    expect(component.text()).toBe('Find a Table');
  });
  // it should execute a clickHandler function when clicked
});
