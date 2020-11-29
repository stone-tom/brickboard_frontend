import { action, observable, computed, runInAction, makeObservable } from 'mobx';
import { enableStaticRendering } from 'mobx-react-lite';

enableStaticRendering(typeof window === 'undefined')

export class Store {
  lastUpdate = 0
  light = false
  isAuthenticated= false
  user= {name: "EMPTY",email: "NOMAIL"}

  constructor() {
    makeObservable(this, {
      lastUpdate: observable,
      light: observable,
      user: observable,
      isAuthenticated: observable,
      hydrate: action,
    })
  }

//   start = () => {
//     this.timer = setInterval(() => {
//       runInAction(() => {
//         this.lastUpdate = Date.now()
//         this.light = true
//       })
//     }, 1000)
//   }

//   get timeString() {
//     const pad = (n) => (n < 10 ? `0${n}` : n)
//     const format = (t) =>
//       `${pad(t.getUTCHours())}:${pad(t.getUTCMinutes())}:${pad(
//         t.getUTCSeconds()
//       )}`
//     return format(new Date(this.lastUpdate))
//   }

//   stop = () => clearInterval(this.timer)

  hydrate = (data) => {
    if (!data) return

    this.user = data.user !== null ? data.user : {name: "EMPTY",email: "NOMAIL"}
    this.isAuthenticated = !!data.isAuthenticated
  }
}