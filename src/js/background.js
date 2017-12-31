const backgroundDataURI = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAADOklEQVR4nO3ZW27bMBhEYa00O+gWiq6gQBbS3fWdfXBcyJeMZIsSSfsb4GCCvJQ/qWOqzvTroxQA95laLwDoGYIAAYIAAYIAAYIAAYIAAYIAAYIAAYIAAYIAAYIAgenjx+kHrfVtTz0sQute2w2idWg3iNahp48fpx8A3EIQIEAQIEAQIEAQIEAQIEAQIEAQIEAQIEAQIEAQIEAQIHAS5M/XL7TWFz31sAite203iNah3SBahz4JAuAuBAECBAECBAECBAECBAECBAECBAECBAECBAECBAECBAECJ0H+fv1Ca33RUw+L0LrXdoNoHdoNonXokyAA7kIQIEAQIEAQIEAQIEAQIEAQIEAQIEAQINClIL9/ZlqvD+9Dc0HuCbAUsuAopqM/qR+VYa0srTcSr3nTT6sfvvK5uWsIkdZaa50te+n18uYhbLjepQ+72s9Pi46CXA/67LC1bos16+xhU7fI8dTMjeR9ZI2tZX62VwlycyA7H/qWjHYYNV4395635utw6/3e5QZ5Ztijbo1n19dD19yfra8z6TWuZkZ77XpakIthy+d/Wosxz7319cJee7Q07xESrF1nr2cz36dNgsyH3fPQt6anwzjigZzP2lqEpfR2Ltf7VEWQ86C9p7UoR+5Rr0LcS+szSftUTZDzoCMkfmX6AnJczzpC9tj/NV+TL+UtBfkuq/7mMJAc87lGSC1Jat6eVQUpZZzDeCaPytLTa04v61jK1g+k2nNWF6SUcQ5jS5YOscc96EnYNXlEkr1mI8jG9PK16SPpfX3zrJFkz3l2EaSUsQ6hdkaYfYQ1npNeu/aeYzdBShnrEGpkhNtjnlFuvHmu/8azd3YVpJSxNn9LRp9zJFGOFHt3QUoZZ+O35FVm9H+pyxBkY0Z4kLakN1mOXs8hgpTSzwbXzCvOlNJ63hb//mGClNLXJ9HWvMocj6bl3C8vyKvkXeU4p8X8rfacIA/m3eUo5fg9aLnnBHkg5Dg2PbySE2RlWh+UtAlBFtLDp5i0C0FCiCEE+SbkkFIIcjfkkHMIchVyyDwEEQkhiEgIQURCCCISQhCREIKIhBBEJIQgIiEEEQkhiEgIQURCCCIS8g9GqujM9levIAAAAABJRU5ErkJggg==';

let background = null;

function initialize() {
  new Promise((resolve) => {
    background = new Image();
    background.onload = () => resolve();
    background.src = backgroundDataURI;
  });
}

function paint(ctx) {
  ctx.drawImage(background, 0, 0);
}

export default {
  initialize,
  paint
};
