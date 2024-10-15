document.addEventListener('DOMContentLoaded',()=>{
    const gridsize=9;
    const solvebtn=document.getElementById("btn")
    solvebtn.addEventListener('click',sudokusolver)


    const sudokugrid=document.getElementById("sudokugrid")
    for(let row=0;row<gridsize;row++){
        const newrow=document.createElement("tr");
        for(let col=0;col<gridsize;col++){
            const cell=document.createElement("td")
            const input=document.createElement("input")
            input.type="Number"
            input.className="cell"
input.id=`cell-${row}-${col}`;
cell.appendChild(input)
newrow.appendChild(cell)        
        }
        sudokugrid.append(newrow);
    }
})

const sudokusolver=async()=>{
    const gridsize=9;
    const sudokuarray=[];

    //fill the array with input values from grid

    for(let row=0;row<gridsize;row++){
        sudokuarray[row]=[];
        for(let col=0;col<gridsize;col++){
            const callid=`cell-${row}-${col}`;
            const cellvalue=document.getElementById(callid).value

            sudokuarray[row][col]=cellvalue!==""? parseInt(cellvalue):0;

        }
    }
       //identify user input cells and mark them

       for(let row=0;row<gridsize;row++){
        for(let col=0;col<gridsize;col++){
const cellid=`cell-${row}-${col}`;
const cell=document.getElementById(cellid)

if(sudokuarray[row][col] !==0){
    cell.classList.add("user-input");
}
        }}

        //solver the sudoku and display the solution
 
        if(solvesudokuhelper(sudokuarray)){
            for(let row =0;row<gridsize;row++){
                for(let col =0;col<gridsize;col++){
                    const cellid=`cell-${row}-${col}`;
                    const cell=document.getElementById(cellid);

                    if(!cell.classList.contains("user-input")){
                        cell.value=sudokuarray[row][col];
                        cell.classList.add("solved");
                        await sleep(20);  //add a delay for visualization
                    }
                }
            }
        }else{
            alert("No solution exists for given pattern")
        }
            
}

function solvesudokuhelper(board){
    const gridsize=9;

    for(let row=0;row<gridsize;row++){
        for(let col=0;col<gridsize;col++){
            if(board[row][col]===0){
for(let num=1;num<=9;num++){
    if(isvalidmove(board,row,col,num)){
        board[row][col]=num;

        //recursively sttemp to solve the sudoku

        if(solvesudokuhelper(board))
        {
            return true;
        }else{
            board[row][col]=0;
        }
return false; 
    }
}
            }
        }
    }
    return true;
}

function isvalidmove(board,row,col,num){
    const gridsize=9;

    for(let i=0;i<gridsize;i++){
        if(board[row][i]===num || board[i][col]===num){
            return false;
        }
    }

     //check the 3*3 subgrid for conflicts

     const startrow=Math.floor(row/3)*3;
     const startcol=Math.floor(col/3)*3;

     for(let i=startrow;i<startrow+3;i++){
        for(let j=startcol;j<startrow+3;j++){
            if(board[i][j]==num){
                return false;
            }
        }
     }
     return true;
}

function sleep(ms){
    return new Promise(resolve=>setTimeout(resolve,ms))
}