 <template>
  <div>
      {{ary}}
  </div>
</template>
<style scoped>
</style>
<script>
export default {
  data() {
    return {
       ary:[]
    };
  },
  created: function() {
    this.getTableView();
  },

  methods: {
    Cell(state,x,y){
        
    },
    getTableView() {
      for(var i=0;i<3;i++){
           ary[i]=[];
          for(var j=0;j<3;j++){
             var cell = new Cell(0,i,j);
               ary[i][j]=0;
          }
      }
    }

   
}
}
</script>