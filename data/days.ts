export interface Day {
  day: string;
  title: string;
  text: string;
  linkUrl: string;
  linkText: string;
}

export const days: Day[] = [
  {
    day: '1',
    title: 'Start with accessibility',
    text: 'Accessibility works best when it is considered from the beginning of a project rather than added just before release. Include accessibility requirements when planning features, writing acceptance criteria, creating designs and choosing components.\n\nAsk accessibility questions early: Can this interaction be used with a keyboard? Will the content still make sense when zoomed? Does the design rely on colour alone? Catching these issues during design is usually much easier than rebuilding an inaccessible solution later.',
    linkUrl: 'https://www.w3.org/WAI/fundamentals/',
    linkText: 'Learn about accessibility fundamentals',
  },
  {
    day: '2',
    title: 'Try using only the keyboard',
    text: 'Put your mouse aside and navigate the page using Tab, Shift+Tab, Enter, Space and the arrow keys. You should be able to reach every interactive element, understand where the focus is and operate controls without needing a mouse.\n\nPay particular attention to menus, dialogs, dropdowns, custom components and forms. Make sure focus moves in a logical order and that users never become trapped inside a component. If something only works with a mouse, start by checking whether a native HTML element could provide the interaction instead.',
    linkUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/keyboard.html',
    linkText: 'Learn about keyboard accessibility',
  },
  {
    day: '3',
    title: 'Write useful alternative text',
    text: 'Alternative text should communicate the purpose or meaning of an image, rather than simply describing what it looks like. Think about why the image is on the page and what information someone would miss if they could not see it.\n\nKeep alt text concise and avoid phrases such as "image of" because screen readers already announce that it is an image. Decorative images should usually use an empty alt attribute, alt="", so they are ignored by assistive technologies. Complex charts or diagrams may need a longer text explanation elsewhere on the page.',
    linkUrl: 'https://www.w3.org/WAI/tutorials/images/',
    linkText: 'Learn how to use images accessibly',
  },
  {
    day: '4',
    title: 'Do not rely on colour alone',
    text: 'Colour can be a useful way to reinforce information, but it should not be the only way that information is communicated. A user who cannot distinguish certain colours may otherwise miss important meaning.\n\nFor example, do not show form errors using only a red border. Add an error message and, where appropriate, an icon or other visual indicator. In charts, combine colour with labels, patterns or different line styles so that each data series can still be identified without colour.',
    linkUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html',
    linkText: 'Learn about the use of colour',
  },
  {
    day: '5',
    title: 'Check colour contrast',
    text: 'Text needs enough contrast against its background to remain readable for people with low vision and for anyone using a screen in difficult lighting conditions. WCAG requires a contrast ratio of at least 4.5:1 for most normal-sized text and 3:1 for large text.\n\nUse a contrast checker while designing rather than waiting until development is finished. Remember to check text placed over images, placeholder text, disabled-looking controls that are still interactive and different component states such as hover and focus.',
    linkUrl:
      'https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html',
    linkText: 'Learn about minimum colour contrast',
  },
  {
    day: '6',
    title: 'Give every form control a clear label',
    text: 'Users should be able to understand what information a form field expects before they interact with it. Give every input, checkbox, radio button and select control a visible label and associate that label programmatically with the control.\n\nDo not use placeholder text as the only label. Placeholders disappear when users type and often have poor contrast. For complicated fields, add instructions or examples outside the input and make sure any required format, such as a date or password requirement, is explained before users encounter an error.',
    linkUrl: 'https://www.w3.org/WAI/tutorials/forms/labels/',
    linkText: 'Learn how to label form controls',
  },
  {
    day: '7',
    title: 'Make keyboard focus easy to see',
    text: "Keyboard users need a clear visual indication of which element currently has focus. Avoid removing the browser's default focus outline unless you replace it with something equally or more visible.\n\nCheck focus indicators against different backgrounds and component states. A subtle colour change is often not enough. Use a clear outline, border or other visual treatment with sufficient contrast, and make sure the focused element is not hidden behind sticky headers, cookie banners or other content.",
    linkUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/focus-visible.html',
    linkText: 'Learn about visible keyboard focus',
  },
  {
    day: '8',
    title: 'Use headings to create structure',
    text: 'Headings help everyone scan and understand a page, but they are especially useful for screen reader users who often navigate directly between headings. Use real HTML heading elements such as h1, h2 and h3 instead of simply making text large and bold.\n\nOrganise headings according to the structure of the content. A subsection should sit underneath its parent heading rather than being chosen because a particular heading level has the right font size. Styling belongs in CSS, while heading levels should communicate hierarchy.',
    linkUrl: 'https://www.w3.org/WAI/tutorials/page-structure/headings/',
    linkText: 'Learn how to structure content with headings',
  },
  {
    day: '9',
    title: 'Write meaningful link text',
    text: 'Links should make sense when users encounter them in context and, where possible, when they are read on their own. Generic phrases such as "click here" and repeated "read more" links make it harder to understand where a link leads.\n\nDescribe the destination or action instead. For example, "Read the accessibility report" is more helpful than "Click here". If several cards contain "Read more" links, give each link a more specific accessible name so screen reader users can distinguish between them.',
    linkUrl: 'https://www.w3.org/WAI/tips/writing/',
    linkText: 'Learn about writing for web accessibility',
  },
  {
    day: '10',
    title: 'Test on smaller screens',
    text: 'Accessibility does not stop at desktop. Check that your interface remains usable on phones and tablets, especially when content reflows into a narrower layout. Users should not have to scroll in two directions just to read ordinary text.\n\nTest menus, dialogs, forms and other interactive components at narrow viewport widths. Make sure content is not clipped, controls do not overlap and important functionality does not disappear. Also check that users can rotate their device unless a particular orientation is genuinely essential.',
    linkUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/reflow.html',
    linkText: 'Learn about accessible reflow',
  },
  {
    day: '11',
    title: 'Zoom to 200 percent',
    text: 'Many people with low vision use browser zoom to make text and interface elements larger. Try zooming your page to 200 percent and check whether all content and functionality are still available.\n\nLook for text that becomes clipped, buttons whose labels no longer fit, overlapping content and controls that disappear off screen. Avoid fixed heights for containers containing text, and allow layouts to grow as text gets larger. Responsive design techniques usually make zoom support much easier.',
    linkUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html',
    linkText: 'Learn about resizing text',
  },
  {
    day: '12',
    title: 'Caption your videos',
    text: 'Prerecorded videos with spoken content should include captions so that people who are deaf or hard of hearing can access the information. Good captions include not only dialogue but also meaningful sounds that are necessary to understand what is happening.\n\nDo not rely entirely on automatically generated captions without reviewing them. Names, technical terminology and accents are frequently transcribed incorrectly. Check timing, punctuation and speaker changes so that captions are easy to follow alongside the video.',
    linkUrl: 'https://www.w3.org/WAI/media/av/captions/',
    linkText: 'Learn about accessible video captions',
  },
  {
    day: '13',
    title: 'Provide alternatives for audio content',
    text: 'If important information is provided through prerecorded audio, make sure people who cannot hear it have another way to access the same information. A text transcript is often the simplest solution for podcasts, interviews and other audio-only content.\n\nA useful transcript should include the spoken information as well as meaningful non-speech sounds where they contribute to understanding. Publish the transcript close to the audio player so users can find it easily rather than placing it somewhere unrelated on the site.',
    linkUrl: 'https://www.w3.org/WAI/media/av/',
    linkText: 'Learn about accessible audio and video',
  },
  {
    day: '14',
    title: 'Make content easier to understand',
    text: 'Clear language improves accessibility for people with cognitive and learning disabilities and also makes content easier for everyone to use. Prefer familiar words, short sentences and direct instructions where possible.\n\nBreak long text into meaningful sections and use headings, lists and paragraphs to make information easier to scan. Explain unfamiliar abbreviations and avoid unnecessary jargon. When users need to complete a task, tell them exactly what they need to do rather than assuming they will infer the next step.',
    linkUrl: 'https://www.w3.org/WAI/tips/writing/',
    linkText: 'Learn about writing accessible content',
  },
  {
    day: '15',
    title: 'Make controls easy to activate',
    text: 'Small buttons and closely packed controls can be difficult to use for people with limited dexterity, tremors or reduced precision. WCAG 2.2 introduces a minimum target size requirement of 24 by 24 CSS pixels in many situations.\n\nRather than making only the visible icon larger, increase the clickable or tappable area around it. Add enough spacing between neighbouring controls so that users are less likely to activate the wrong one. This is particularly important for icon buttons, checkboxes and controls used on mobile devices.',
    linkUrl:
      'https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html',
    linkText: 'Learn about minimum target sizes',
  },
  {
    day: '16',
    title: 'Avoid flashing content',
    text: 'Rapidly flashing content can trigger seizures for some people and can also be distracting or uncomfortable for others. Avoid effects that flash repeatedly, especially large areas of bright, high-contrast colour.\n\nIf animation or movement is not essential, consider whether it is needed at all. Where movement is useful, keep it subtle and give users a way to pause or stop content that starts automatically and continues for more than a few seconds.',
    linkUrl:
      'https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html',
    linkText: 'Learn about preventing dangerous flashing',
  },
  {
    day: '17',
    title: 'Use native HTML before ARIA',
    text: 'Native HTML elements already include much of the keyboard behaviour, semantics and accessibility information that browsers and assistive technologies expect. Use elements such as button, input, select and details whenever they meet your needs.\n\nARIA can add accessibility information, but it does not automatically add behaviour. A div with role="button", for example, still needs keyboard interaction, focus handling and other behaviour implemented manually. Before building a custom component, check whether HTML already provides an accessible equivalent.',
    linkUrl: 'https://www.w3.org/WAI/ARIA/apg/practices/read-me-first/',
    linkText: 'Learn when to use ARIA',
  },
  {
    day: '18',
    title: 'Announce important status messages',
    text: 'Modern interfaces often update content without loading a new page. Messages such as "Item added to basket", "Search complete" or "Form saved" may be visually obvious but can easily be missed by screen reader users.\n\nUse appropriate live region techniques, such as role="status" or role="alert", when a message needs to be announced automatically. Do not move keyboard focus to every notification. Focus should normally remain where the user is working while assistive technology announces the update.',
    linkUrl: 'https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html',
    linkText: 'Learn about accessible status messages',
  },
  {
    day: '19',
    title: 'Write helpful error messages',
    text: 'An error message should do more than tell users that something went wrong. Clearly identify which field contains the problem and explain what needs to change. "Enter a date in the format DD/MM/YYYY" is much more useful than "Invalid input".\n\nPlace error messages close to the relevant field and associate them programmatically so screen reader users receive the same information. If a form submission produces several errors, provide a clear summary and make it easy for users to find and correct each problem.',
    linkUrl:
      'https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html',
    linkText: 'Learn about accessible error messages',
  },
  {
    day: '20',
    title: 'Manage focus carefully',
    text: 'Dynamic interfaces sometimes require keyboard focus to move, but unexpected focus changes can be extremely confusing. When opening a modal dialog, for example, focus should normally move into the dialog and remain within it while the dialog is open.\n\nWhen the dialog closes, return focus to the control that opened it whenever possible. For ordinary page updates, avoid moving focus unless there is a clear reason. Test complete interactions with the keyboard rather than checking individual components in isolation.',
    linkUrl: 'https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/',
    linkText: 'Learn about keyboard focus management',
  },
  {
    day: '21',
    title: 'Try a screen reader',
    text: 'Automated accessibility tools cannot tell you whether a page makes sense when experienced through a screen reader. Spend some time navigating your interface with VoiceOver, NVDA, JAWS or TalkBack and listen to what is actually announced.\n\nCheck whether headings provide useful structure, form controls have understandable names and buttons communicate their purpose. Also test dynamic interactions such as dialogs, validation and expanded content. You do not need to become an expert screen reader user before this testing starts revealing useful problems.',
    linkUrl: 'https://www.w3.org/WAI/test-evaluate/tools/',
    linkText: 'Explore accessibility testing tools',
  },
  {
    day: '22',
    title: 'Give users enough time',
    text: 'Some people need considerably longer to read information, understand instructions or complete forms. Avoid unnecessary time limits and do not automatically end a task simply because a user takes longer than expected.\n\nWhen a time limit is necessary, warn users before it expires and provide a way to extend it where possible. Pay particular attention to authentication sessions, booking processes, quizzes and forms containing a large amount of information.',
    linkUrl:
      'https://www.w3.org/WAI/WCAG22/Understanding/timing-adjustable.html',
    linkText: 'Learn about adjustable time limits',
  },
  {
    day: '23',
    title: 'Combine automated and manual testing',
    text: 'Automated accessibility tools are excellent at finding certain problems, such as missing accessible names, invalid ARIA and some colour contrast failures. They cannot determine whether every interaction makes sense or whether a keyboard user can successfully complete a task.\n\nUse automated testing as one layer of your accessibility process rather than as a final accessibility score. Combine it with keyboard testing, zoom and reflow testing, manual inspection and assistive technology testing. Testing real user journeys is especially valuable because accessibility problems often appear when several components interact.',
    linkUrl: 'https://www.w3.org/WAI/test-evaluate/',
    linkText: 'Learn about accessibility evaluation',
  },
  {
    day: '24',
    title: 'Include people with disabilities',
    text: 'WCAG and accessibility testing provide essential guidance, but they cannot fully represent how people experience a product in real life. Whenever possible, include people with disabilities in research, usability testing and product development.\n\nInvolve users early enough that their feedback can influence the solution rather than asking them to validate an almost-finished product. Combine user feedback with WCAG evaluation rather than treating one as a replacement for the other. Technical conformance and real-world usability are both important parts of creating accessible products.',
    linkUrl: 'https://www.w3.org/WAI/planning/involving-users/',
    linkText: 'Learn about involving users in accessibility',
  },
];
