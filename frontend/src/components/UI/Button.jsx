const Button = ({ style, children }) => {
  return <button className={`btn ${style}`}>{children}</button>;
};

export default Button;
