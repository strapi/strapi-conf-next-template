import React, { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from 'react-use';
import { nanoid } from 'nanoid';

/**
 * this is actually ugly but it's the only way to include
 * JS scripts with SSR and NextJS router
 */

// get iframe document
const getIframeDoc = iframe => {
  if (iframe.contentDocument) return iframe.contentDocument;
  else if (iframe.contentWindow) return iframe.contentWindow.document;

  return iframe.document;
};

// get iframe content
const getIframe = (script, id) => {
  const resizeScript = `<script>
  function resize() {
    const element = parent.document.getElementById('${id}')
    if (element) parent.document.getElementById('${id}').style.height = document.body.scrollHeight + 'px'
  }

  document.addEventListener('load', resize)
  document.addEventListener('DOMContentLoaded', function() {
    resize()
    setTimeout(function() {
      resize()
    }, 1000)
  })
  window.addEventListener('resize', resize)
</script>`;
  return `<html><head><base target="_parent"></head><body>${script}${resizeScript}</body></html>`;
};

const Script = ({ className, content, attribs }) => {
  const iframe = useRef();
  const [id, setID] = useState();

  // on content/attribs update, set a new ID
  useIsomorphicLayoutEffect(() => {
    setID(nanoid());
  }, [content, attribs]);

  // on new ID set, update the iframe with computed content
  useIsomorphicLayoutEffect(() => {
    // stringify params from ReactMarkdown HTML parser
    const formattedProps = Object.keys(attribs).reduce((acc, key) => {
      const value = attribs[key];
      acc += value ? ` ${key}="${value}"` : ` ${key}`;
      return acc;
    }, '');

    const doc = getIframeDoc(iframe.current);
    const next = getIframe(`<script${formattedProps}>${content}</script>`, id);

    // update the iframe content following the new iframe data
    // iframe.current.src = 'about:blank'

    doc.open();
    if (doc.body) doc.body.innerHTML = '';
    doc.writeln(next);
    doc.close();
  }, [id]);

  return (
    <iframe
      className={className}
      ref={iframe}
      key={id}
      id={id}
      width="100%"
      height="0"
      frameBorder={0}
    />
  );
};

Script.defaultProps = {
  content: ''
};

export default Script;
