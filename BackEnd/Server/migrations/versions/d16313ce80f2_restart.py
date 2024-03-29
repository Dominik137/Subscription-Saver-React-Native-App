"""restart

Revision ID: d16313ce80f2
Revises: 
Create Date: 2024-03-18 12:39:04.582772

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'd16313ce80f2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('Subscriptions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('service_name', sa.String(), nullable=True),
    sa.Column('website_link', sa.String(), nullable=True),
    sa.Column('cost', sa.Float(), nullable=True),
    sa.Column('due_date', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_Subscriptions'))
    )
    op.create_table('Users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(), nullable=False),
    sa.Column('_password_hash', sa.String(), nullable=False),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_Users')),
    sa.UniqueConstraint('username', name=op.f('uq_Users_username'))
    )
    op.create_table('SubscriptionSets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('subscription_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['subscription_id'], ['Subscriptions.id'], name=op.f('fk_SubscriptionSets_subscription_id_Subscriptions')),
    sa.ForeignKeyConstraint(['user_id'], ['Users.id'], name=op.f('fk_SubscriptionSets_user_id_Users')),
    sa.PrimaryKeyConstraint('id', name=op.f('pk_SubscriptionSets'))
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('SubscriptionSets')
    op.drop_table('Users')
    op.drop_table('Subscriptions')
    # ### end Alembic commands ###
