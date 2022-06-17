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


function partition(arr=[],l,r,animations=[])
{

  const pivot=arr[Math.floor((l+r)/2)]
  let i=l
  let j=r
  while(i<=j)
  {
      while(arr[i]<pivot)
      i++
      while(arr[j]>pivot)
      j--;
      if(i<=j)
      {
        [i,j]=[j,i]
        animations.push([i,j,arr[i],arr[j]])
        animations.push([i,j,arr[i],arr[j]])
        animations.push([i,j,arr[i],arr[j]])
        i++;
        j--;
      }
  }
  return i;
}

function quickSort(arr=[],l,r,animations=[])
{
  let temp
  if(arr.length>1)
  {
      temp=partition(arr,l,r,animations)
      if(l<temp-1)
      quickSort(arr,l,temp-1,animations)    
      if (temp<r)
      quickSort(arr,temp,r,animations)
  }
}

export function quickAnimations(arr)
{
  const animations=[]
  if(arr.length<=1)
  return arr
  quickSort(arr,0,arr.length-1,animations)
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

function swap(array, a, b) {
  let temp = array[a];
  array[a] = array[b];
  array[b] = temp;
}