import React, { useState } from 'react';
import styled from 'styled-components';
import CalendarHeaders from './CalendarHeaders';


const CalendarWrapper = styled.div`
  position: relative;
  top: 12px;
  right: 35px;
  height: 200px;
  width: 293px;
  
  border: 1px solid #999999;
  border-radius: 3px;
  background-color: white;

  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  z-index: 99;
`;

const MonthWrapper = styled.h2`
  margin: auto;
  margin-top: 8px;
  font-size: 16px;
  color: #333333;
  text-align: center;
`;

const TableWrapper = styled.div`
  margin:auto;
  margin-top: 6px;
  display: table;
  width: 295px;
  border-collapse: collapse;
`;

const RowWrapper = styled.div`
  display: table-row;
`;

const Day = styled.div`
  display: table-cell;
  border: 1px solid #999999;
  height: 32px;
  font-size: 13px;
  vertical-align: middle;
  text-align: center;
  color: #333333;
`;


const Calendar = () => {
  // eslint-disable-next-line no-unused-vars
  return (
    <CalendarWrapper>
      <MonthWrapper>March 2020</MonthWrapper>
      <TableWrapper>
        <CalendarHeaders />
        <tbody>
          <RowWrapper>
            <Day>1</Day>
            <Day>2</Day>
            <Day>3</Day>
            <Day>4</Day>
            <Day>5</Day>
            <Day>6</Day>
            <Day>7</Day>
          </RowWrapper>
          <RowWrapper>
            <Day>8</Day>
            <Day>9</Day>
            <Day>10</Day>
            <Day>11</Day>
            <Day>12</Day>
            <Day>13</Day>
            <Day>14</Day>
          </RowWrapper>
          <RowWrapper>
            <Day>15</Day>
            <Day>16</Day>
            <Day>17</Day>
            <Day>18</Day>
            <Day>19</Day>
            <Day>20</Day>
            <Day>21</Day>
          </RowWrapper>
          <RowWrapper>
            <Day>22</Day>
            <Day>23</Day>
            <Day>24</Day>
            <Day>25</Day>
            <Day>26</Day>
            <Day>27</Day>
            <Day>28</Day>
          </RowWrapper>
        </tbody>
      </TableWrapper>
    </CalendarWrapper>
  );
};

export default Calendar;
