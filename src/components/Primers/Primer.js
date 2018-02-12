import React from 'react';
import Aux from '../common/Aux';

const Primer = ({ primer, i }) => (
  <Aux>
    <h3>{primer.title}</h3>
    {primer.content.map((section, s) => {
      const title =
        section.heading && section.heading.title ? section.heading.title : null;
      const body = section.body;
      const btype = body && body.type;
      if (!body && !title) {
        return null;
      }
      return (
        <Aux key={`primer-${i}-section-${s}`}>
          <div className={section.tag} key={section.tag}>
            {title && (
              <div className="section-head" style={style.sectionHead}>
                {title}
              </div>
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

const style = {
  title: {
    fontSize: '3em',
    fontWeight: 700,
  },
  sectionHead: {
    fontSize: '2em',
    fontWeight: 400,
  },
};

export default Primer;
