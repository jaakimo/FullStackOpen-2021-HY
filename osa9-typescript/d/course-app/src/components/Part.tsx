import React from 'react';
import {
  CourseNormalPart,
  CourseProjectPart,
  CourseRequirementsPart,
  CourseSubmissionPart,
} from '../App';

// part
type PartProps =
  | CourseNormalPart
  | CourseProjectPart
  | CourseSubmissionPart
  | CourseRequirementsPart;

const Part = ({ coursePart }: { coursePart: PartProps }) => {
  switch (coursePart.type) {
    case 'normal':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          {coursePart.description}
        </p>
      );
    case 'groupProject':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          Project exercises: {coursePart.groupProjectCount}
        </p>
      );
    case 'submission':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          {coursePart.description}
          <br />
          submit to {coursePart.exerciseSubmissionLink}
        </p>
      );
    case 'special':
      return (
        <p>
          <b>
            {coursePart.name} {coursePart.exerciseCount}
          </b>
          <br />
          {coursePart.description}
          <br />
          knowledge requirements: {coursePart.requirements.join(', ')}
        </p>
      );
    default:
      return null;
  }
};

export default Part;
