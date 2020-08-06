import puppeteer from "puppeteer";

export default async ({ cookies, link, message }) => {
    const messageButtonSel = '.message-anywhere-button'
    const messageFormSel = '.msg-form__contenteditable'
    const sendDelay = 100
    const viewportSize = {
        width: 1920,
        height: 1080
    }
    const agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36'
    const extraHTTPHeaders = { 'Accept-Language': 'en-GB,en-US;q=0.9,en;q=0.8' }
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] })
    const page = await browser.newPage()
    //@ts-ignore
    await page.setCookie(...cookies)
    await page.setUserAgent(agent)
    await page.setExtraHTTPHeaders(extraHTTPHeaders)
    await page.setViewport(viewportSize)
    await page.goto(link)
    await page.click(messageButtonSel)
    await page.focus(messageFormSel)
    await page.keyboard.type(message)
    await page.waitFor(sendDelay)
    await page.keyboard.down('Control')
    await page.keyboard.press('Enter')
    await page.keyboard.up('Control')
    await browser.close()
}
