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

function partition(arr,l,r,animations)
{
  let pivotIndex=l
  let pivotValue=arr[r]
  for (let i=l;i<r;i++)
  {
    animations.push([0,i, pivotIndex])
    if (arr[i]<pivotValue)
    {
      swap(arr,i,pivotIndex)
      animations.push([2,i,pivotIndex])
      animations.push([1,i,pivotIndex])
      pivotIndex++
    }
    animations.push([1, i, pivotIndex])
  }
  swap(arr,pivotIndex,r)
  animations.push([2,pivotIndex,r])
  animations.push([1,pivotIndex,r])
  return pivotIndex
}

function quickSort(arr,l,r,animations)
{
  if(l>=r)
  return
  let i=partition(arr,l,r,animations)
  quickSort(arr,l,i-1,animations)
  quickSort(arr,i+1,r,animations)
}

export function quickAnimations(arr)
{
  const animations=[]
  quickSort(arr,0,arr.length-1,animations)
  animations.push([4,0,0])
  return animations  
}

export function selectionSortAnimation(arr)
{
  const animations=[]
  for(let j=0;j<arr.length-1;j++)
  {
    let min=j
    for (let i=j+1;i<arr.length;i++)
    {
      animations.push([0,i,min])
      animations.push([1,i,min])
      if (arr[i]<=arr[min])
      min=i
    }
    if(min!==j)
    {
      animations.push([2,min,j])
      animations.push([3,min,j])
      swap(arr,j,min)
    }
    else
    animations.push([3,min,j])
  }
  animations.push([4,0,0])
  return animations
}

function swap(arr,a,b) {
  let temp=arr[a];
  arr[a]=arr[b];
  arr[b]=temp;
}