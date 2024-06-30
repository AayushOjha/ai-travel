import { Fragment } from "react";

function DescriptionComponent({ description }) {
  // Split the description string by newline characters
  const descriptionLines = description.split("\n");

  return (
    <div className="desc-comp">
      {/* Map through each line and render it with a <br /> element */}
      {descriptionLines.map((line, index) => (
        <Fragment key={index}>
          {line}
          <br />
        </Fragment>
      ))}
    </div>
  );
}

export { DescriptionComponent };