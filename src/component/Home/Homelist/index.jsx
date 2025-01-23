import React from 'react'
import Wrapper from './style'

const HomeList = ({user, setIndex}) => {
  return (
    <Wrapper>
      <h1>Hi {user.name}</h1>
      <p>Please select your choices !</p>

      <form action="" className="choice">
        <select name="" id="">
            <option disabled selected>-- Select year --</option>
            <option value="2024">2024</option>
            <option value="2025">2025</option>
        </select>

        <select name="" id="">
            <option disabled selected>-- Select class --</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
        </select>

        <select name="" id="">
            <option disabled selected>-- Select section --</option>
            <option value="1">A</option>
            <option value="2">B</option>
            <option value="3">C</option>
        </select>

        <select name="" id="">
            <option disabled selected>-- Select quarter --</option>
            <option value="1">I</option>
            <option value="2">II</option>
            <option value="3">III</option>
            <option value="4">IV</option>
        </select>

        <select name="" id="">
            <option disabled selected>-- Select quarter --</option>
            <option value="1">English</option>
            <option value="2">Hindi</option>
            <option value="3">Maths</option>
            <option value="4">Computers</option>
        </select>

        <input type="submit" value="Get started" onClick={e => setIndex(2)} />

      </form>
    </Wrapper>
  )
}

export default HomeList
