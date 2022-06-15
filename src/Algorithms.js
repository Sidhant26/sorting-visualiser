function merge(arr,l,h,animations,temp)
{
  const mid=Math.floor((l+h)/2)
  let i=l,j=l,k=mid+1
  while(i<=mid && k<=h)
  {
    animations.push([i,k])
    animations.push([i,k])
    if(temp[i]<=temp[k])
    {
      animations.push([j,temp[i]])
      arr[j++]=temp[i++]
    }
    else
    {
      animations.push([j,temp[k]])
      arr[j++]=temp[k++]
    }
  }
  while(i<=mid)
  {
    animations.push([i,i])
    animations.push([i,i])
    animations.push([j,temp[i]])
    arr[j++]=temp[i++]
  }
  while(j<=h)
  {
    animations.push([k,k])
    animations.push([k,k])
    animations.push([k,temp[j]])
    arr[j++]=temp[k++]
  }
}

function mergeSort(arr,l,h,temp,animations)
{
  if(l===h)
  return
  const mid=Math.floor((l+h)/2)
  mergeSort(temp,l,mid,arr,animations)
  mergeSort(temp,mid+1,h,arr,animations)
  merge(arr,l,h,animations,temp)
}

export function mergeAnimations(arr)
{
  const animations=[]
  if(arr.length<=1)
  return arr
  const temp=arr.slice()
  mergeSort(arr,0,arr.length-1,temp,animations)
  return animations
}