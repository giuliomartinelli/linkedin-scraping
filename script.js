const puppeteer = require('puppeteer');
require('dotenv').config();


(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage({ timeout: 60000 });
    await page.goto('https://www.linkedin.com/home');

    await page.type('#session_key', process.env.LINKEDIN_EMAIL);
    await page.type('#session_password', process.env.LINKEDIN_PASSWORD);

    await page.waitForSelector('[data-id="sign-in-form__submit-btn"]');
    await page.click('[data-id="sign-in-form__submit-btn"]');
    //await page.waitForTimeout(2000);
    await page.waitForNavigation();


    await page.goto(process.env.LINKEDIN_URL, { timeout: 60000,waitUntil: 'networkidle0' });
/*
    await page.waitForSelector('.artdeco-card.pv-profile-card.break-words');
    const content = await page.evaluate(() => {
        
        const elements = document.querySelectorAll('.artdeco-card.pv-profile-card.break-words');
        let array = [];
        
        elements.forEach(element => {
            

            const about      = element.querySelector('#about');
            const experience = element.querySelector('#experience');

            if (about) {
                array.push({
                    title: 'about',
                    content: element.querySelector('span[aria-hidden="true"]').innerText.trim()
                });
            }

            if (experience) {
        
        
                const exps = element.querySelectorAll('.artdeco-list__item');
                let expArr = [];
        
                exps.forEach(exp => {
                    const header      = exp.querySelector('.display-flex.flex-column.full-width')
                    const headerTitle = header.querySelector('.display-flex.flex-wrap.align-items-center.full-height')
                    const headerTitleSpan1 = headerTitle.querySelector('.display-flex.flex-wrap.align-items-center.full-height')
                    const headerTitleSpan2 = headerTitleSpan1.querySelector('.display-flex.flex-wrap.align-items-center.full-height')
                    const headerTitleSpan3 = headerTitleSpan2.querySelector('.display-flex.flex-wrap.align-items-center.full-height')
                    
                    const text = exp.querySelector('.inline-show-more-text--is-collapsed')

                    const textSpan = text.querySelector('span[aria-hidden="true"]')
                    
                    

                    
                    expArr.push({
                        title: headerTitle.innerText.trim(),
                        info1: headerTitleSpan1.innerText.trim(),
                        info2: headerTitleSpan2.innerText.trim(),
                        info3: headerTitleSpan3.innerText.trim(),
                        text: textSpan.innerText.trim(),
                    });

                });
                
                array.push(expArr);

            }

            // about
            // experience

            //let nextDiv = element.nextElementSibling;
            //const span = element.querySelector('span');
            //const title = span ? span.innerText.trim() : null;
            
          });
        
        
        return array;        
        //return div.innerHTML;
    }); 
      
    console.log(content);
    */ 
    await browser.close();
  })();

