<template>
    <div class="print__proposals">
        <el-button class="chap-button" @click="dialogFormVisible = true" type="primary" size="medium">
            <icon name="print"></icon> Récapitulatif
        </el-button>

        <el-dialog :title="`Liste des propositions`" :visible.sync="dialogFormVisible" size="full">
            <el-row>
                <div class="recap__header">
                    <el-col :span="6">
                        <span class="label">Film</span>
                    </el-col>
                    <el-col :span="4">
                        <span class="label">Proposé par</span>
                    </el-col>
                    <el-col :span="13">
                        <span class="label">A voté</span>
                    </el-col>
                    <el-col class="p-nb" :span="1">
                        <span>Votes</span>
                    </el-col>
                </div>
            </el-row>
            <el-row class="recap__item" v-for="(propal, index) in proposals" :key="index">
                <el-col :span="6">
                    <span class="p-title">{{propal.title}}</span>
                </el-col>
                <el-col :span="4">
                    <span class="p-submitter">{{propal.submitter.username}}</span>
                </el-col>
                <el-col :span="13">
                    <span class="p-likes">{{formatLikes(propal.likes)}}</span>
                </el-col>
                <el-col class="p-nb" :span="1">
                    <span>{{propal.nbLike}}</span>
                </el-col>
            </el-row>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" class="chap-button" @click="print()">Imprimer</el-button>
                <el-button class="chap-button" @click="dialogFormVisible = false">Annuler</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
export default {
    props: ['proposals'],
    data() {
        return {
            dialogFormVisible: false,
        }
    },
    methods: {
        formatLikes(likes) {
            return likes.map(vote => vote.username).join(' - ')
        },
        print() {
            console.log('printing ...');
            window.print()

        }
    }
}
</script>
<style lang="scss" scoped>
.p-nb {
    text-align: center;
    font-weight: bold;
}

.recap__header {
    padding: 10px;
    display: table;
    width: 100%;
    border-bottom: 1px solid #333;
    span {
        font-weight: bold;
        font-size: 16px;
    }
}

.recap__item {
    padding: 10px;
    display: table;
    width: 100%;
    font-size: 16px;
    &:nth-child(odd) {
        background: #f3f3f3;
    }
}
@media print {
    .dialog-footer{
        display: none;
    }
}
</style>
