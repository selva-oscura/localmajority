import React from 'react';
import PrimerStyling from './PrimerStyling';
import Aux from '../Aux';

const Primer = ({ primer, i }) => (
  <Aux>
    <h3>{primer.title}</h3>
    {primer.content.map((section, s) => {
      const title =
        section.heading && section.heading.title ? section.heading.title : null;
      const specialStyling =
        section.heading &&
        section.heading.options &&
        section.heading.options.style
          ? section.heading.options.style
          : '';
      const body = section.body;
      const btype = body && body.type;
      if (!body && !title) {
        return null;
      }
      return (
        <Aux key={`primer-${i}-section-${s}`}>
          <div className={section.tag} key={section.tag}>
            {title && (
              <h3 className="section-head">
                <PrimerStyling styling={specialStyling}>{title}</PrimerStyling>
              </h3>
            )}

            {btype === 'RichText' && (
              <div
                className="section-body"
                dangerouslySetInnerHTML={{
                  __html: body.text,
                }}
              />
            )}
            {btype === 'Image' && <img src={body.url} alt="alt text FIXME" />}
            {btype === 'PlainText' && (
              <div className="section-body">{body.text}</div>
            )}
          </div>
        </Aux>
      );
    })}
  </Aux>
);

export default Primer;
