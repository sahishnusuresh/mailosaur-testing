import { test, expect } from '@playwright/test';
import MailosaurClient from 'mailosaur';
import MailoSaurClient from "mailosaur"
import fetch from "node-fetch"
import dotenv from 'dotenv'
const randomname=(num)=>{
  let str=''
  for(let i=0;i<num;i++){
    let random=Math.floor(Math.random()*27)
    str+=String.fromCharCode(97+random)
  }
  return str;
}
const prefix=randomname(7)
dotenv.config()
const server_id=process.env.server_id
const api_key=process.env.api_key
const company_name="oslash"

test('has title', async ({ page }) => {
  await page.goto('https://app.oslash.com/login/');
  const email=`${prefix}-prod-bot@${server_id}.mailosaur.net`
  await page.locator('input#email').fill(email)
  const testdate=new Date()
  await page.getByRole('button',{name:"Send"}).click()
  const mailosaur=new MailosaurClient(api_key)
  const testemail=await mailosaur.messages.get(server_id,{
    sentTo:email,},{receivedAfter:testdate})
  console.log(testemail.html?.links)
const links=testemail.html?.links as Array<HTMLLinkElement>
await page.goto(links[1].href)
await page.locator('input#workspaceName').fill(prefix)
await page.locator('input#companyName').fill(company_name)
const delay=async (time)=>new Promise(resolve=> setTimeout(resolve,time))
await delay(4000)
await page.locator('button',{hasText:"Start 15-day Free Trial"}).click()

await page.pause()
});


