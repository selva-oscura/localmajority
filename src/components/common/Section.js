import React from 'react';

const Section = ({ background, hasContainer, spacingAbove, spacingBelow }) => {
  let backgroundColor;
  if (background === 'light') {
    backgroundColor = 'background-light';
  } else if (background === 'medium') {
    backgroundColor = 'background-medium';
  } else if (background === 'dark') {
    backgroundColor = 'background-dark';
  } else {
    backgroundColor = '';
  }

  let spacingDefault = 12;
  let marginTop =
    spacingAbove && Number(spacingAbove)
      ? spacingDefault * spacingAbove + 'px'
      : '0px';
  let marginBottom =
    spacingBelow && Number(spacingBelow)
      ? spacingDefault * spacingBelow + 'px'
      : '0px';
  let styles = { marginTop, marginBottom };

  return (
    <section className={backgroundColor}>
      {hasContainer ? (
        <div className="container" style={styles}>
          {props.children}
        </div>
      ) : (
        <div style={styles}>{props.children}</div>
      )}
    </section>
  );
};

export default Section;
