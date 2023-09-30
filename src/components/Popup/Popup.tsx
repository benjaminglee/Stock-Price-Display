const Popup = () => {
  // const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  // const handleButtonClick = () => {
  //   if (currentMessageIndex !== messages.length - 1) {
  //     setCurrentMessageIndex(() => currentMessageIndex + 1);
  //   } else {
  //     onConfirm();
  //   }
  // };

  // const isLastMessage = currentMessageIndex === messages.length - 1;

  return (
    <div>
      {/* <div className='backdrop'>
          <div className='mainContent'>
            {xButton ?
              <div className='xButton'onClick={onClose}>
                <img
                  src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAJ1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADdEvm1AAAADHRSTlMA/FxWVFX24SRGQiAKsFgkAAAAv0lEQVQ4y83ToQ7CQAwG4AWYIChIADNBgsPxCDgk9whYHG5yYo+wTO8tpuf7UDNt/q1/KuZ2qs312+7aXLb2Vbv8bcHhf5ttbK+VRr2cZjtPKTVKMkzRppCz6UKRERQiRh0SIsi4CikTy1HjEBEgIkAghIwQMsLo7ggaeVTCSJTwn4jQTvC1+AQLTp2HN01Rd/Kwoymawi6c3MtNm4giIkBEgBwBIgIE8pm2FoUtvayfRvuve42XzsLGteqRrXyNs2xjNk6tUT4AAAAASUVORK5CYII='
                  style={{ width: '20px', height: '20px' }}
                  alt=''
                />
              </div> : null}
            <div style={{ textAlign: 'center' }}>
              {image ?
                <img
                  className="img-responsive"
                  id="logo1"
                  src={image}
                  style={{
                    width:'90px',
                    marginBottom:'10px'
                  }}
                  alt=''
                />:null}
              {heading ? <p className='header'>{heading}</p> : null}
              <p className='message'>{messages[currentMessageIndex]}</p>
              {yesNoButton ? (
                <div className='yesNoButtonContainer'>
                  <button className='yesNoButton' onClick={onClose}>No</button>
                  <button className='yesNoButton right' onClick={handleButtonClick}>Yes</button>
                </div>
              ) : (
                <button className='continueButton' onClick={handleButtonClick}>
                  {
                    isLastMessage
                      ? 'Done'
                      : 'Continue'
                  }
                </button>
              )}
            </div>
          </div>
        </div> */}
    </div>
  );
};
