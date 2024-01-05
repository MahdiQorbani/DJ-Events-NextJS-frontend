import Input from "./Input";
import Joi from "joi-browser";
import moment from "moment";

function useForm(props) {
  const { schema, onSubmit, values, setValues, errors, setErrors } = props;

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(values, schema, options);
    if (!error) return null;

    const faults = {};
    for (let item of error.details) faults[item.path[0]] = item.message;
    return faults;
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const rules = { [name]: schema[name] };
    const { error } = Joi.validate(obj, rules);
    return error ? error.details[0].message : null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const faults = validate(values, schema);
    setErrors(faults || {});
    if (faults) return;

    onSubmit();
  };

  const handleChange = ({ currentTarget: input }) => {
    const faults = { ...errors };
    const errorMessage = validateProperty(input);
    if (errorMessage) faults[input.name] = errorMessage;
    else delete faults[input.name];

    const data = { ...values };
    data[input.name] = input.value;

    setErrors(faults);
    setValues(data);
  };

  const renderInput = (name, label) => {
    return (
      <Input
        key={name}
        label={label}
        textarea={name === "description" ? "true" : "false"}
        type={
          name === "date" ||
          name === "password" ||
          name === "time" ||
          name === "email"
            ? name
            : "text"
        }
        name={name}
        value={
          name === "date"
            ? moment(values[name]).format("yyy-MM-DD")
            : values[name]
        }
        error={errors[name]}
        onChange={handleChange}
      />
    );
  };

  const renderButton = (label) => {
    return (
      <button disabled={validate()} type="submit" className="btn">
        {label}
      </button>
    );
  };

  return {
    handleSubmit,
    renderButton,
    renderInput,
  };
}

export default useForm;
