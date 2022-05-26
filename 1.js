        dragStartDay(e){
            console.log('dragStart',e.detail.scrollTop)

            this.setData({
                startPosition3: e.detail.scrollTop
            })
        },
        dragEndDay(e){
            console.log('dragEnd',e.detail.scrollTop)
            let endTop = e.detail.scrollTop
            let { startPosition3, itemHeight, lastPosition3,days } = this.data
            let height = Math.abs(endTop - startPosition3) < (itemHeight / 2)
            console.log('height',height)
            if(height){
                this.setData({
                    endPosition3: e.detail.scrollTop,
                    scrollTop3: lastPosition3
                })
            }else{
                let num = Math.round(Math.abs(endTop - startPosition3) / itemHeight)
                let scrollHeight = itemHeight * num
                let value = (lastPosition3 + scrollHeight)/itemHeight
                console.log('value',value)
                if((endTop - startPosition3) < 0){
                    scrollHeight = - scrollHeight
                }
                this.setData({
                    scrollTop3: lastPosition3 + scrollHeight,
                    lastPosition3: lastPosition3 + scrollHeight,
                    'value[2]': days[value]
                })
            }
        },


        