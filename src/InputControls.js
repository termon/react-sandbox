import React from "react";
import PropTypes from "prop-types";

export const DisplayAsPills = ({ values }) => {
  return (
    <div>
      {values.map(v => (
        <span key={v} className="badge badge-pill badge-secondary">
          {v}
        </span>
      ))}
    </div>
  );
};

DisplayAsPills.propTypes = {
  values: PropTypes.array.isRequired
};

export const DisplayImageUrl = ({ url, alt }) => {
  return (
    <div>
      <img src={url} width="100" alt={alt || "Image"} />
    </div>
  );
};

DisplayImageUrl.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string
};

export const RadioButtonGroupControl = props => (
  <div className="form-group">
    <label for={props.name}>{props.title}</label>
    {props.values.map(v => (
      <div className="form-check form-check-inline">
        <input
          classname="form-check-input"
          type="radio"
          id={props.name + v}
          value={v}
        />
        <label className="form-check-label" for={props.name + v}>
          {v}
        </label>
      </div>
    ))}
  </div>
);

export const InputControl = props => (
  <div className="form-group">
    <label for={props.name}>{props.title}</label>
    <input
      className="form-control"
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.change}
      placeholder={props.placeholder}
    />
  </div>
);

export const TextAreaControl = props => (
  <div className="form-group">
    <label for={props.name}>{props.title}</label>
    <textarea
      rows={props.rows || 5}
      className="form-control"
      name={props.name}
      type={props.type}
      value={props.value}
      onChange={props.change}
      placeholder={props.placeholder}
    />
  </div>
);

InputControl.propTypes = {
  type: PropTypes.oneOf(["text", "number", "date"]).isRequired,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  change: PropTypes.func.isRequired,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  placeholder: PropTypes.string
};

TextAreaControl.propTypes = {
  ...InputControl.proptypes,
  rows: PropTypes.number
};

InputControl.defaultProps = {
  type: "text"
};

export default InputControl;
