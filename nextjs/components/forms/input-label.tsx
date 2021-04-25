function QuestionArrow() {
  return (
   <svg width="11" height="10" xmlns="http://www.w3.org/2000/svg">
    <g fillRule="nonzero">
      <path d="M7.586 5L4.293 1.707 5.707.293 10.414 5 5.707 9.707 4.293 8.293z"></path>
      <path d="M8 4v2H0V4z"></path>
    </g>
  </svg>
  );
}

export type InputLabelProps = {
  name: string
  text: string
  required?: boolean
};

export function InputLabel(props: InputLabelProps) {
  const mandatoryText = props.required ? " *" : null;
  return (
    <div className='q-text'>
      <QuestionArrow/> <label htmlFor={props.name}>{props.text}{mandatoryText}</label><br/>
    </div>
  );
}
